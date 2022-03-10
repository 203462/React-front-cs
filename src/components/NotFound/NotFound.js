import NotFoundStyle from './NotFoundStyle.module.css'

export default function Home(){
    return(
        <div className={NotFoundStyle.main}>
            <p>Error 404. No encontrado.</p>
        </div>
    );
}