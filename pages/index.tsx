import { GetStaticProps } from "next";
import React, { useState } from "react";
import { withLayout } from "../layout/Layout";
import axios from "axios";
import { MenuItem } from "../interfaces/menu.interface";
import { Input, Htag, Button, Rating, Textaria } from "../components";
import { API } from "../helpers/api";

function Home({ menu }: HomeProps) {
  const [rating, setRating] = useState(3);
  return (
    <>
      <Htag tag="h1">text</Htag>
      <Rating rating={rating} isEditable={true} setRating={setRating} />
      <Button appearance="primary" arrow="right">
        button
      </Button>
      <Button appearance="ghost" arrow="down">
        button
      </Button>
      <Input placeholder="test" />
      <div>
        <Textaria placeholder="test" />
      </div>
    </>
  );
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0;
  const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
    firstCategory,
  });
  return {
    props: {
      menu,
      firstCategory,
    },
  };
};

interface HomeProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: number;
}
