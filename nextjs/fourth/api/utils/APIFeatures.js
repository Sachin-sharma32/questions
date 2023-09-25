class APIFeatures{
  constructor(Model, query){
    this.Model = Model;
    this.query = query;
  }
  filter(){
    let queryStr = JSON.stringify(this.query);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)
    queryStr = JSON.parse(queryStr)
    this.Model = this.Model.find(queryStr)
    return this;
  }
  sort(){
    if(this.query.sort){
      this.Model = this.Model.sort(this.query.sort)
    }else{
      this.Model = this.Model.sort("-price")
    }
    return this
  }
  pagination(){
    const page = this.query.page | 1;
    const limit = this.query.limit | 3;
    const skip = (page-1)*3;
    this.Model = this.Model.skip(skip).limit(limit)
    return this
  }
  fieldLimit(){
    if(this.query.fields){
      this.Model = this.Model.select(this.query.fields.split(",").join(' '))
    }else{
      this.Model = this.Model.select("-__v -_id")
    }
    return this
  }
}

module.exports = APIFeatures