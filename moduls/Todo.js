class Todo{
    constructor(id,title,describtion){
        this.id=id,
        this.title=title,
        this.describtion=describtion,
        this.create_at=new Date()
    }
}
module.exports=Todo