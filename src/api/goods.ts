import request from '@/util/request'

interface QueryGoods {
	page?: number;
	size?: number;
	typeOneId?: number;
	typeTwoId?: number;
}

interface Goods {
	img_list_url: string;
	img_url: string;
	mack: string;
	nice: string;
	price: string;
	supplier: string;
	title: string;
	type_one_id: number;
	type_two_id: number;
}

const goods = {
	queryGoods: (params: QueryGoods) => request.get('/queryGoods', params),
	addGoods: (params: Goods) => request.post('/addGoods', params),
}

export default goods