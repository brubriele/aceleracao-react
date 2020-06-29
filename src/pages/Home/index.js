import React, { useState, useEffect } from 'react';

import CardProduct from '../../components/CardProduct/index';
import { getCatalog } from '../../services/catalog';
import { useQuery } from '../../utils/customHooks';

import '../defaultStyles.scss';
import './index.scss';

const Home = () => {
  const query = useQuery();
  const search = query.get('search');
  const [catalog, setCatalog] = useState([]);

  useEffect(() => {
    getCatalog().then((resp) => setCatalog(resp.data));
  }, []);

  useEffect(() => {
    if (search) {
      console.log(search);
      const results = catalog.filter((product) =>
        product.name
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .includes(
            search
              .toLowerCase()
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
          )
      );

      setCatalog(results);
    } else {
      getCatalog().then((resp) => setCatalog(resp.data));
    }
  }, [search]);

  return (
    <div className='pageContent'>
      {catalog &&
        catalog.map((item) => {
          return (
            <CardProduct
              key={item.code_color}
              src={item.image}
              alt={`${item.name}`}
              discountPrice={
                item.discount_percentage !== '' ? `${item.discount_percentage} OFF` : ''
              }
              className={item.on_sale ? 'discount' : 'discount--none'}
              name={item.name}
              onSale={item.on_sale}
              actualPrice={item.actual_price}
              regularPrice={item.regular_price}
              productId={item.code_color}
            />
          );
        })}
    </div>
  );
};

export default Home;
