import React from 'react';
import { PProps } from './PTag.props';
import styles from './PTag.module.css'
import cn from 'classnames'

const PTag = ({size = 'm', children, className, ...props}: PProps): JSX.Element => {
	const pStyle = cn(styles.p, className, {
		[styles.m]: size == 'm',
		[styles.s]: size == 's',
		[styles.l]: size == 'l',
	})

	return ( <p className={pStyle} {...props}>{children}</p> );
}
 
export default PTag;