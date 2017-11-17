import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import firebase from '../config/firebase';
var db = firebase.firestore();

class ApprovedBrand extends Component {
    constructor(props){
        super(props);
        this.state = {
            uid: false,
            redirect: false,
            currentPage: null,
            brandData: false,
            productData: false
        }
    }

    componentWillMount() {
        firebase.auth().onAuthStateChanged((user)=>{
            if(user){
                db.collection('brands').doc(user.uid).get().then((res)=>{
                    if(res.exists && res.data().approved){
                        this.setState({
                            brandStatus: true,
                            brandCreated: true,
                            brandData: res.data(),
                            uid: user.uid,
                            redirect: false,
                            currentPage: '',
                        })
                        let productRef = db.collection("brands").doc(this.state.uid).collection("products");
                        let productData = {}
                        productRef.get().then((res)=>{
                            res.forEach((product)=>{
                                console.log(product.id, product.data())
                                return productData[product.id] = product.data()
                            })
                        }).then(()=>{
                            console.log(productData)
                            this.setState({productData: productData})
                        }).catch(err=>{console.log(err)})
                    }else if(res.exists && !res.data().approved){
                        this.setState({
                            redirect: true,
                            currentPage: '/profile'
                        })
                    }
                })
            }else{
                this.setState({
                    redirect: true,
                    currentPage: '/account/login'
                }) 
            }
        })
    }

    componentWillUpdate(nextProps, nextState) {
        if(nextProps.authState && nextState.uid === false){
            console.log("update")
            return true;
        }else{
            console.log(" no update")
            return false;
        }
    }
    
    renderGallery(){
        if(this.state.productData){
            return(
                <div className="ui link cards">
                    {Object.values(this.state.productData).map((product, i)=>{
                        return(
                            <div className="card" key={i}>
                                <div className="image">
                                    <img src={product[Object.keys(product)[0]]} alt=""/>
                                </div>
                                <div className="content">
                                    <div className="header">{product.title}</div>
                                        <div className="meta">
                                            <a>{product.category}</a>
                                        </div>
                                    <div className="description">
                                        {product.description}
                                    </div>
                                </div>
                                <div className="extra content">
                                    <span className="right floated">
                                        Size: {product.size}
                                    </span>
                                    <span className="left floated">
                                        <i className="shop icon"></i>
                                        {product.item_count}
                                    </span>
                                </div>
                            </div>     
                        )
                    })}
                </div>
            )
        }else{
            return(
                <div className="ui active inverted dimmer">
                    <div className="ui indeterminate text loader">Preparing Files</div>
                </div>
            )
        }
    }

    renderPage(){
        if(this.state.brandData && this.state.productData){
            return(
                <div className="brand-page">
                    <h1 className="page-title">{this.state.brandData.name}</h1>
                    <Link to="/profile/product-create"><button className="ui button">List A Item</button></Link>
                    <div className="product-gallery">
                        {this.renderGallery()}
                    </div>
                </div>
            )
        }else if(this.state.brandData && !this.state.productData){
            return(
                <div className="card">No Products Yet</div>
            )
        }else{
            return(
                <div className="ui active inverted dimmer">
                    <div className="ui indeterminate text loader">Preparing Files</div>
                </div>
            )
        }
    }

    render(){
        const {redirect, currentPage} = this.state;
        return(
            <section id="brand-page">
                {redirect ? <Redirect to={currentPage} /> : null}
                {this.renderPage()}
            </section>
        )
    }
}

export default ApprovedBrand;