import React from 'react';
import { FooterProps } from './Footer.props';
import styles from './Footer.module.css'
import cn from "classnames"
import { format } from "date-fns"

const Footer = ({className,...props}: FooterProps): JSX.Element => {

	const footerStyle = cn(className, styles.footer)
	return ( 
		<div className={footerStyle} {...props}>
	    	<div className={styles.first}>OwlTop © 2020 - {format(new Date(), 'yyyy')} Все права защищены</div>
		    <a href='#'>Пользовательское соглашение</a>
		    <a  href='#'>Политика конфиденциальности</a>
		</div>
	 );
}
 
export default Footer;