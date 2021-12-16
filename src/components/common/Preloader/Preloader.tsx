import React from 'react';
import preloader from '../../../../src/assets/images/loading.gif';

let Preloader: React.FC = () => {
  return (
    <div style={{backgroundColor: 'white'}}><img src={preloader}/>loading</div>
  )
}

export default Preloader;