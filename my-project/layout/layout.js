import styles from "../styles/layout.module.css"

export default function Layout({ children }){
return (
    <div className={"flex h-screen bg-blue-400 rounded-xl"}>
     <div className={"m-auto bg-white rounded-2xl w-3/5 h-auto grid lg:grid-cols-2"}>
         <div className={styles.imgStyle}>
            <div className={styles.cartoonImg}>
            </div>
            <div className={styles.cloudOne}></div>
                <div className={styles.cloudTwo}></div>

         </div>
         <div className={"right flex flex-col justify-evenly flex-grow flex-shrink"}>
             <div className={"text-center py-10"}>
                 {children}
             </div>
         </div>
     </div>

    </div>
)

}