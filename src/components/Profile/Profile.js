import axios from "axios";
import ProfileCss from "./Profile.module.css";
import { Link } from "react-router-dom";

const Profile = () => {
    let user,name,last,correo,imagen,url_imagenProfile,userRespaldo,nameRespaldo, lastRespaldo, correoRespaldo;

    const consumir_profile = () => {
        let postData = new FormData();
        
        name = document.getElementById("name").value 
        last = document.getElementById("lastname").value 
        user = document.getElementById("username").value 
        correo = document.getElementById("email").value 
        imagen = document.getElementById('img').files[0];
        
        if(user === ""){
            user = userRespaldo;
        }
        if(name === ""){
            name = nameRespaldo;
        }
        if(last === ""){
            last = lastRespaldo;
        }
        if(correo === ""){
            correo = correoRespaldo;
        }
        if(imagen === undefined){
            console.log("No se actualizó la foto")
        }else{
            postData.append('url_img', imagen); 
        }
        
        postData.append('id_user', localStorage.getItem('userIdLocal'));
        postData.append('first_name',name);
        postData.append('last_name',last);
        postData.append('username',user);
        postData.append('email',correo);

        axios
        .post("http://localhost:8000/api/v1/user/profile/", postData, {
                headers: { 
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Token ' + localStorage.getItem('tokenLocal'),
                },
            })
            .then((response) =>{
                console.log(response.data);
                if(response.data.url_img === null){
                    url_imagenProfile = "http://127.0.0.1:8000/assets/img-profile/default.jpg"
                }else{
                    url_imagenProfile = "http://127.0.0.1:8000" + response.data.url_img;
                }
                window.location.reload();
                document.getElementById('imgProfile').src = url_imagenProfile;
            })
            .catch((error)=>{
                console.log(error.response)
                console.log(error.response.data);
                if(error.response.data.id_user != null){
                    consumir_put();
                }
        })
        }

    const consumir_put = () =>{
        let putData = new FormData();

        if(imagen === undefined){
            imagen = ""
        }

        putData.append('url_img', imagen);
        putData.append('first_name',name);
        putData.append('last_name',last);
        putData.append('username',user);
        putData.append('email',correo);

        axios
            .put("http://localhost:8000/api/v1/user/profile/"+localStorage.getItem('userIdLocal'),putData,{
                headers : {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Token ' + localStorage.getItem('tokenLocal'),
                },
            })
            .then((response) =>{
                console.log(response.data);
                respaldoVariables(response.data);
                if(response.data.url_img === null){
                    url_imagenProfile = "http://127.0.0.1:8000/assets/img-profile/default.jpg"
                }else{
                    url_imagenProfile = "http://127.0.0.1:8000" + response.data.url_img;
                }
                document.getElementById('imgProfile').src = url_imagenProfile;
                document.getElementById('img').value = ""; 
                window.location.reload();
            })
            .catch((error)=>{
                console.log(error);
            })
    }

    const respaldoVariables = (value) => {
        nameRespaldo = value.first_name;
        lastRespaldo = value.last_name;
        userRespaldo = value.username;
        correoRespaldo = value.email;
    }
    
    window.onload = function cargarDatos(){
        axios
            .get("http://localhost:8000/api/v1/user/profile/"+localStorage.getItem('userIdLocal'),{
            headers : { 
                'Authorization': 'Token ' + localStorage.getItem('tokenLocal'),
            },
        })
        .then((response) =>{
            console.log(response.data);
            respaldoVariables(response.data);
            if(response.data.url_img === null){
                url_imagenProfile = "http://127.0.0.1:8000/assets/img-profile/default.jpg";
            }else{
                url_imagenProfile = "http://127.0.0.1:8000" + response.data.url_img;
            }
            document.getElementById('imgProfile').src = url_imagenProfile;
            document.getElementById('name').placeholder = response.data.first_name;
            document.getElementById('lastname').placeholder = response.data.last_name;
            document.getElementById('username').placeholder = response.data.username;
            document.getElementById('email').placeholder = response.data.email;
        })
        .catch((error) =>{
            console.log(error.response.data);
            document.getElementById('imgProfile').src = "http://127.0.0.1:8000/assets/img-profile/default.jpg"
        })
    }
    return(
        <div className={ProfileCss.body}>
            <div className={ProfileCss.profileContainer}>
                <div className={ProfileCss.profileImg}>
                <img alt="No image" id="imgProfile"/>
                </div>
                <input accept="image/*" type="file" id="img"></input>
                <div className={ProfileCss.profileInfo}>
                    <div className={ProfileCss.profileField}>
                        <p><b>Nombre: </b><input id="name"></input></p>
                    </div>
                    <div className={ProfileCss.profileField}>
                        <p><b>Apellido: </b><input id="lastname"></input></p>
                    </div>
                    <div className={ProfileCss.profileField}>
                        <p><b>Nombre de usuario: </b><input id="username"></input></p>
                    </div>
                    <div className={ProfileCss.profileField}>
                        <p><b>Correo: </b><input id="email"></input></p>
                    </div>
                </div>
                <button onClick={consumir_profile}>Guardar</button><br/>
                <div className={ProfileCss.backLogin}>
                    <Link to="/">Cerrar sesión</Link>
                </div>
            </div>
        </div>
    );
}

export default Profile;