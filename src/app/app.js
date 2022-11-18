import React,{Component}  from "react";

class App extends Component{

    constructor(){
        super();
        this.state = {
            usuario: "",
            Contraseña: ""  
        };
        this.login = this.login.bind(this);
        this.hundlechange = this.hundlechange.bind(this);
    }

    login(e){
        console.log(this.state);
        fetch('/api/tasks/login',{
            method: 'POST',
            body: JSON.stringify(this.state),
            headers : {
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data =>{
            console.log(data);
            if (data.message == "correcto"){
                alert("login success")
                window.localStorage.setItem("token",data.data);
                window.location.href = "./userDetails";

            }else{
                alert(data.message)
            }
            this.setState({usuario:'',Contraseña:''});
        })        
        .catch(err => console.error(err));

        e.preventDefault();
    }

    hundlechange(e){
        const {name,value} = e.target;
        this.setState({
            [name]: value
    });
    }


    render(){
        return(
            <form onSubmit={this.login}>
                <div class="input__item">
                    <input name="usuario" onChange={this.hundlechange} type="text" placeholder="Email address" value={this.state.usuario}></input> 
                    <span class="icon_mail"></span>
                </div>
                <div class="input__item">
                                <input name="Contraseña" onChange={this.hundlechange} type="password" placeholder="Password" value={this.state.Contraseña}></input>
                                <span class="icon_lock"></span>
                            </div>
                <button type="submit" class="site-btn">Login Now</button>
            </form>
        )
    }
}

export default App