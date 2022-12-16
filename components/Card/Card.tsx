import React from 'react';
import { CardProps } from './Card.props';
import styles from './Card.module.css'
import cn from 'classnames'

const Card = ({color = 'white', children, className, ...props}: CardProps): JSX.Element => {
	const cardStyle = cn(styles.card, className, {
		[styles.blue]: color == 'blue'
	})

	return (
		<div className={cardStyle} {...props}>
			{children}
		</div>
	);
}
 
export default Card;