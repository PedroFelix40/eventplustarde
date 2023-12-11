import React from 'react';
import './VisionSection.css'
import Title from '../Title/Title';

const VisionSection = () => {
    return (
        <section className='vision'>
            <div className='vision__box'> 
                <Title
                    titleText={'Visão'}
                    color='white'
                    additionalClass='vision__title'
                />

                <p className='vision__text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, laudantium, autem sit, mollitia aperiam fuga cum voluptates quaerat repellendus fugit debitis delectus incidunt consectetur corporis tempore magnam adipisci doloremque! Delectus.</p>
            </div>
        </section>
    );
};

export default VisionSection;