import React, { useState } from 'react';
import Button from '../components/button/Button';
import  Htag  from '../components/Htag/Htag'
import Rating from '../components/Rating/Rating';


export default function Home() {
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
