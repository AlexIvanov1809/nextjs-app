import React from 'react';
import Htag from '../../components/Htag/Htag';
import Tag from '../../components/Tag/Tag';
import { TopPageComponentProps } from './TopPageComponent.props';
import styles from './TopPageComponent.module.css'
import Card from '../../components/Card/Card';
import HhData from '../../components/HhData/HhData';
import { TopLevelCategory } from '../../interfaces/topPage.interface';


const TopPageComponent = ({page, products, firstCategory}: TopPageComponentProps) => {
	return ( 
		<div className={styles.wrapper}>
			<div className={styles.title}>
				<Htag tag='h1'>{page.title}</Htag>
				{products && <Tag color='grey' size='m'>{products.length}</Tag>}
				<span>Sort</span>
			</div>
			<div>
				{products && products.map(p => (<div key={p._id}>{p.title}</div>))}
			</div>
			<div className={styles.hhTitle}>
				<Htag tag='h2'>Вакансии - {page.category}</Htag>
				<Tag color='red' size='m'>hh.ru</Tag>
				<span>Sort</span>
			</div>
			{firstCategory === TopLevelCategory.Courses && <HhData {...page.hh}/>}
		</div>
	 );
}
 
export default TopPageComponent;