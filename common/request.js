export default{
	common:{
		method:'GET',
		header:{
			'content-type':"application/json",
			'authorization':''
		},
		data:{}
	},
	request(options={}){
		options.url='/api'+options.url
		console.log("url:")
		console.log(options.url)
		options.method=options.method||this.common.method
		options.header=options.header||this.common.header
		
		return new Promise((res,rej)=>{
			uni.request({				
				...options,
				success: (result) => {
					if(result.statusCode!=200){
						uni.showToast({
							title:'请求失败',
							icon:' none'
						})
						return rej(result.data)
					}
					res(result.data)
				},
				fail:(error)=> {
					
				}
			})
		})
		
	},
	get(url,data={},options={}){
		options.url=url
		options.data=data
		options.method='GET'
		return this.request(options)
	},
	post(url,data={},options={}){
		options.url=url
		options.data=data
		options.method='POST'
		return this.request(options)
	}
}