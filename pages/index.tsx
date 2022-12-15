import { GetStaticProps } from 'next';
import React, { useState } from 'react';
import Button from '../components/button/Button';
import  Htag  from '../components/Htag/Htag'
import Rating from '../components/Rating/Rating';
import  { withLayout }  from '../layout/Layout';
import axios from 'axios'
import { MenuItem } from '../interfaces/menu.interface';

function Home({menu}: HomeProps) {
	const [rating, setRating] = useState(3);
  return (
    <>
			<Htag tag='h1'>text</Htag>
			<Rating rating={rating} isEditable={true} setRating={setRating}/>
			<Button appearance='primary' arrow='right'>button</Button>
			<Button appearance='ghost' arrow='down'>button</Button>
    </>
  )
}

export default withLayout(Home)

export const getStaticProps: GetStaticProps<HomeProps> =async () => {
	const firstCategory = 0
	const {data: menu} = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', {
		firstCategory
	})
	return {
		props: {
			menu,
			firstCategory
		}
	}
}

interface HomeProps extends Record<string, unknown> {
	menu: MenuItem[]
	firstCategory: number
}