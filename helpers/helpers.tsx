import CoursesIcon from './icons/hat.svg'
import ServicesIcon from './icons/cloud.svg'
import BooksIcon from './icons/book.svg'
import ProductsIcon from './icons/box.svg'
import { FirstLevelMenuItem } from '../interfaces/menu.interface'
import { TopLevelCategory } from '../interfaces/topPage.interface'


export const firstLevelMenu: FirstLevelMenuItem[] = [
	{route: 'courses', name: 'Курсы', icon: <CoursesIcon/>, id: TopLevelCategory.Courses},
	{route: 'services', name: 'Сервис', icon: <ServicesIcon/>, id: TopLevelCategory.Services},
	{route: 'books', name: 'Книги', icon: <BooksIcon/>, id: TopLevelCategory.Books},
	{route: 'products', name: 'Продукты', icon: <ProductsIcon/>, id: TopLevelCategory.Products}
	]

	export const priceRu = (price: number): string => price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ').concat(' ₽')