import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import firebase from '../config/firebase';

// Initialize Cloud Firestore through firebase
var db = firebase.firestore();

class BrandForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            brandStatus: false,
            uid: false,
            currentUser: undefined,
            redirect: false,
            currentPage: null
        }
    }

    componentWillMount() {
        firebase.auth().onAuthStateChanged(user=>{
            if(user){
                db.collection('users').doc(user.uid).get()
                .then(res=>{
                    this.setState({currentUser: res.data()})
                }).catch(err=>console.log(err))

                this.setState({
                    uid: user.uid,
                    redirect: false,
                    currentPage: ''
                })

                let brandRef = db.collection("brands").doc(this.state.uid);
                brandRef.get().then((res)=>{
                    if(res.exists && res.data().approved){
                        this.setState({brandStatus: true})
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
    
    handleSubmit=(e)=>{
        e.preventDefault();
        if(firebase.auth().currentUser.emailVerified.valueOf()){
            console.log("Submitting Brand")
            db.collection("brands").doc(firebase.auth().currentUser.uid).set({
                name: this.state.name,
                inventory_size: this.state.inventory_size,
                description: this.state.description,
                shipping_address: this.state.shipping_address,
                links: this.state.links,
                website: this.state.website,
                creation_time: new Date(),
                id: Date.now(),
                approved: false
            },{ merge: true })
            .then(()=>{
                db.collection("users").doc(firebase.auth().currentUser.uid).collection("brand").doc(this.state.name).set({
                    name: this.state.name,
                    inventory_size: this.state.inventory_size,
                    description: this.state.description,
                    shipping_address: this.state.shipping_address,
                    links: this.state.links,
                    website: this.state.website,
                    creation_time: new Date(),
                    id: firebase.auth().currentUser.uid,
                    approved: false
                }).catch(err=>(console.log(err)))
                this.setState({

                })
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            });
        }else{
            var errorMessage = `You must first verify your email before registering a brand`;
            var formError = document.getElementById("form-error");
            formError.innerHTML = (`<div class="ui message"> <div class="header">We had some issues</div><ul class="list"><li>${errorMessage}</li></ul></div>`)
        }
    }

    handleChange=(e)=>{
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        })
    }
    renderPage = () => {
        if(this.state.brandStatus){
            let brandRef = db.collection("brands").doc(this.state.uid);
            brandRef.get().then((res)=>{
            if(res.exists && res.data().approved){
                // Brand is approved
                console.log("brand is approved")
                this.setState({
                    redirect: true,
                    currentPage: '/profile/brand'
                })
            }else if(res.exists && res.data().approved === false){
                var errorMessage = `Your brand has not been approved yet! \n Contact us if this problem persists : `;
                var formError = document.getElementById("brand-error");
                formError.innerHTML = (`<div class="ui message"> <div class="header">We had some issues</div><ul class="list"><li>${errorMessage}</li></ul></div>`) 
            }
        })
        }else{
            return(
                <div>
                    <h1 className="page-title">Create a Brand</h1>
                    <h3>Brands must first be approved before you are allowed to post</h3>
                    <form onSubmit={this.handleSubmit} className="ui equal width form">
                        <div id="form-error"></div>
                        <div className="two fields">
                            <div className="field">
                                <div className="ui labeled input">
                                    <div className="ui label">
                                        Brand Name
                                    </div>
                                    <input required="true" name="name" type="text" placeholder="Brand Name" onChange={(e)=>this.handleChange(e)}/>
                                </div>
                            </div>
                            <div className="field">
                                <div className="ui labeled input">
                                    <div className="ui label">
                                        Inventory
                                    </div>
                                    <input required="true" name="inventory_size" type="number" placeholder="Inventory Count" onChange={(e)=>this.handleChange(e)}/>
                                </div>
                            </div>
                        </div>

                        <div className="three field">
                            <div className="field">
                                <label>Brand Description</label>
                                <textarea required="true" name="description" rows="2" placeholder="Brand Description" onChange={(e)=>this.handleChange(e)}></textarea>        
                            </div>
                            <div className="field">
                                <label>Shipping Address</label>
                                <textarea name="shipping_address" rows="2" placeholder="Where will you ship from?" onChange={(e)=>this.handleChange(e)}></textarea>
                            </div>
                            <div className="field">
                                <label>Social Media Links</label>
                                <textarea name="links" rows="2" placeholder="Separate All Social Media links with a comma" onChange={(e)=>this.handleChange(e)}></textarea>
                            </div>
                        </div>

                        <div className="field">
                            <div className="ui labeled input">
                                <div className="ui label">
                                    Website Url
                                </div>
                                <input name="website" type="text" placeholder="https://example.com" onChange={(e)=>this.handleChange(e)}/>
                            </div>
                        </div>
                        <button className="ui primary button" type="submit">Save</button>
                    </form>
                </div>
            )
        }
    }
    render(){
        const {redirect, currentPage} = this.state;
        return(
            <section id="brand-form">
                {redirect ? <Redirect to={currentPage} /> : null}
                <div id="brand-error"></div>
                {this.state.uid ? this.renderPage() : null}
            </section>
        )
    }
}

export default BrandForm;