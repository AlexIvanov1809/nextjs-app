import React, { useContext } from 'react';
import { AppContext } from '../../context/app.context';
import { FirstLevelMenuItem, PageItem } from '../../interfaces/menu.interface';
import { TopLevelCategory } from '../../interfaces/topPage.interface';
import styles from './Menu.module.css'
import CoursesIcon from './icons/hat.svg'
import ServicesIcon from './icons/cloud.svg'
import BooksIcon from './icons/book.svg'
import ProductsIcon from './icons/box.svg'
import cn from "classnames"

const firstLevelMenu: FirstLevelMenuItem[] = [
{route: 'courses', name: 'Курсы', icon: <CoursesIcon/>, id: TopLevelCategory.Courses},
{route: 'services', name: 'Сервис', icon: <ServicesIcon/>, id: TopLevelCategory.Services},
{route: 'books', name: 'Книги', icon: <BooksIcon/>, id: TopLevelCategory.Books},
{route: 'products', name: 'Продукты', icon: <ProductsIcon/>, id: TopLevelCategory.Products}
]

const Menu = (): JSX.Element => {
	const {menu, setMenu, firstCategory} = useContext(AppContext)

	const buildFirstLevel = () => {
		return (
			<>
				{firstLevelMenu.map(firstMenu => (
					<div key={firstMenu.route}>
						<a href={`/${firstMenu.route}`}>
							<div className={cn(styles.firstLevel, {
								[styles.firstLevelActive]: firstMenu.id == firstCategory
								})}>
								{firstMenu.icon}
								<span>{firstMenu.name}</span>
							</div>
						</a>
						{firstMenu.id == firstCategory && buildSecondLevel(firstMenu)}
					</div>
				))}
			</>
		)
	}

	const buildSecondLevel = (firstLevelMenu: FirstLevelMenuItem) => {
		return (
			<div className={styles.secondBlock}>
				{menu.map( m => (
					<div key={m._id.secondCategory}>
						<div className={styles.secondLevel}>{m._id.secondCategory}</div>
						<div className={cn(styles.secondLevelBlock, {
							[styles.secondLevelBlockOpened]: m.isOpened
						})}>
							{!m.isOpened && buildThirdLevel(m.pages, firstLevelMenu.route)}
						</div>
					</div>
				))}
			</div>
		)
	}

	const buildThirdLevel = (pages: PageItem[], route: string) => {
		return (
			pages.map(p => (
				<a key={p.category} href={`/${route}/${p.alias}`} className={cn(styles.thirdLevel, {
					[styles.thirdLevelActive]: false
				})}>
					{p.category}
				</a>
			))
		)
	}

	return ( 
		<div className={styles.menu}>
	    {buildFirstLevel()}
		</div>
	 );
}
 
export default Menu;