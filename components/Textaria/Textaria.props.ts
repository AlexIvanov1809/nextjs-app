import { TextareaHTMLAttributes, DetailedHTMLProps } from "react";
import { FieldError } from "react-hook-form";

export interface TextariaProps
  extends DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  error?: FieldError;
}
