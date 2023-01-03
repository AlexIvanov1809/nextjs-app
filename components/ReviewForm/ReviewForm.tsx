import React, { useState } from "react";
import { ReviewFormProps } from "./ReviewForm.props";
import styles from "./ReviewForm.module.css";
import cn from "classnames";
import { Input } from "../Input/Input";
import { Rating } from "../Rating/Rating";
import { Textaria } from "../Textaria/Textaria";
import { Button } from "../button/Button";
import CloseIcon from "./close.svg";
import { useForm, Controller } from "react-hook-form";
import { IReviewForm, IReviewSentResponse } from "./ReviewForm.interface";
import axios from "axios";
import { API } from "../../helpers/api";

export const ReviewForm = ({
  productId,
  isOpened,
  className,
  ...props
}: ReviewFormProps): JSX.Element => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm<IReviewForm>();

  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<string>();
  const reviewFormStyle = cn(styles.reviewForm, className);

  const onSubmit = async (formData: IReviewForm) => {
    try {
      const { data } = await axios.post<IReviewSentResponse>(
        API.review.createDemo,
        { ...formData, productId }
      );
      if (data.message) {
        setIsSuccess(true);
        reset();
      } else {
        setIsError("Что-то пошло не так");
      }
    } catch (error) {
      if (error instanceof Error) {
        setIsError(error.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={reviewFormStyle} {...props}>
        <Input
          {...register("name", {
            required: { value: true, message: "Заполните поле имя" },
          })}
          error={errors.name}
          placeholder="Имя"
          tabIndex={isOpened ? 0 : -1}
          aria-invalid={errors.name ? true : false}
        />
        <Input
          {...register("title", {
            required: { value: true, message: "Заполните поле заголовок" },
          })}
          error={errors.title}
          className={styles.title}
          placeholder="Заголовок отзыва"
          tabIndex={isOpened ? 0 : -1}
          aria-invalid={errors.title ? true : false}
        />
        <div className={styles.rating}>
          <span>Оценка:</span>
          <Controller
            control={control}
            name="rating"
            rules={{
              required: { value: true, message: "Укажите рейтинг" },
            }}
            render={({ field }) => (
              <Rating
                isEditable
                rating={field.value}
                ref={field.ref}
                setRating={field.onChange}
                error={errors.rating}
                tabIndex={isOpened ? 0 : -1}
              />
            )}
          />
        </div>
        <Textaria
          {...register("description", {
            required: { value: true, message: "Заполните поле описание" },
          })}
          error={errors.description}
          placeholder="текст отзыва"
          className={styles.description}
          tabIndex={isOpened ? 0 : -1}
          aria-label="Текст отзыва"
          aria-invalid={errors.description ? true : false}
        />
        <div className={styles.submit}>
          <Button
            appearance="primary"
            tabIndex={isOpened ? 0 : -1}
            onClick={() => clearErrors()}
          >
            Отправить
          </Button>
          <span className={styles.info}>
            * Перед публикацией отзыв пройдет предварительную модерацию и
            проверку
          </span>
        </div>
      </div>
      {isSuccess && (
        <div className={cn(styles.success, styles.panel)} role="alert">
          <div className={styles.successTitle}>Ваш отзыв отправлен</div>
          <div>Спасибо, ваш отзыв будет опубликован после проверки</div>
          <button
            className={styles.close}
            onClick={() => setIsSuccess(false)}
            aria-label="Закрыть оповещение"
          >
            <CloseIcon />
          </button>
        </div>
      )}
      {isError && (
        <div className={cn(styles.error, styles.panel)} role="alert">
          {isError}
          <button
            className={styles.close}
            onClick={() => setIsError("")}
            aria-label="Закрыть оповещение"
          >
            <CloseIcon />
          </button>
        </div>
      )}
    </form>
  );
};
