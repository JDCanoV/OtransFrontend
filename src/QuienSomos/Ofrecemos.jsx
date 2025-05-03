import React from "react";
import HeaderEmpresa from "../Header/HeaderEmpresa";
import styles from './Ofrecemos.module.css';
import { motion } from "framer-motion";

const Ofrecemos = () => {
  return (
    <>
      <HeaderEmpresa />
      <div className={styles.container}>

        {/* Imagen de portada */}
        <div className={styles.headerImage}>
          <h1 className={styles.headerTitle}>Quiénes somos</h1>
        </div>

        {/* Título con animación y engranaje */}
        <section className={styles.intro}>
          <motion.div
            className={styles.titleWithIcon}
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <img
              src="/Ruedas.png"
              alt="Engranaje ecológico"
              className={styles.iconSpin}
            />
            <h2>Trabajamos por Colombia</h2>
          </motion.div>
          <p className={styles.subtitle}>Conectamos carga, confianza y compromiso.</p>
        </section>

        {/* Imagen + texto sostenibilidad (sin animación) */}
        <section className={styles.emotiveSection}>
          <div className={styles.emotiveContent}>
            <motion.img
              src="https://source.unsplash.com/600x300/?logistics,truck"
              alt="Transporte sostenible"
              className={styles.emotiveImage}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.5 }}
            />
            <div className={styles.emotiveText}>
              <h3>Sostenibilidad y eficiencia logística</h3>
              <p>
                Más del <strong>90% de la carga terrestre en Colombia</strong> se mueve por carretera. En Otrans conectamos a
                empresas con transportistas certificados, ofreciendo trazabilidad, seguridad y velocidad en los envíos. 
                Nuestra plataforma reduce tiempos de gestión en un <strong>45%</strong> y optimiza rutas mediante tecnología de geolocalización.
              </p>
              <p>
                Impulsamos un transporte responsable, promoviendo el uso de vehículos en regla y generando oportunidades económicas para cientos de conductores independientes.
              </p>
            </div>
          </div>
        </section>

        {/* Información de Otrans */}
        <section className={styles.infoOtrans}>
          <h2>Información de Otrans</h2>
          <div className={styles.cardContainer}>
            <div className={styles.card}>
              <img src="https://source.unsplash.com/200x150/?register,business" alt="Registro" />
              <h4>Registro Seguro</h4>
              <p>Empresas y transportistas pueden registrarse en minutos. Todos los datos y documentos son verificados por nuestro equipo de soporte.</p>
            </div>
            <div className={styles.card}>
              <img src="https://source.unsplash.com/200x150/?map,route" alt="Rutas" />
              <h4>Rutas Inteligentes</h4>
              <p>Visualiza rutas, cotiza precios y gestiona el estado del viaje en tiempo real. Todo desde una sola plataforma web y móvil.</p>
            </div>
            <div className={styles.card}>
              <img src="https://source.unsplash.com/200x150/?payment,online" alt="Pagos" />
              <h4>Pagos Digitales</h4>
              <p>Pagos 100% seguros a través de tarjeta, PSE, Nequi o Daviplata. Transportistas reciben sus ganancias directamente.</p>
            </div>
          </div>
         
        </section>
          {/* Información de Otrans */}
          <section className={styles.infoOtrans}>
          <h2>Nuestro Equipo</h2>
          <div className={styles.cardContainer}>
            <div className={styles.card}>
              <img src="https://source.unsplash.com/200x150/?register,business" alt="Registro" />
              <h4></h4>
              <p></p>
            </div>
            <div className={styles.card}>
              <img src="https://source.unsplash.com/200x150/?map,route" alt="Rutas" />
              <h4></h4>
              <p></p>
            </div>
            <div className={styles.card}>
              <img src="https://source.unsplash.com/200x150/?payment,online" alt="Pagos" />
              <h4></h4>
              <p></p>
            </div>
          </div>
          <p className={styles.textoFinal}>
            Somos una red de soluciones de transporte comprometida con conectar personas, ideas y oportunidades en todo el territorio nacional.
          </p>
        </section>
      </div>
    </>
  );
};

export default Ofrecemos;
