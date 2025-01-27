import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../../styles/coffee-store.module.css';
import cls from 'classnames';
import coffeeStoresData from '../../data/coffee-stores.json';
import { fetchCoffeeStores } from '../../lib/coffee-stores';
import { useContext, useEffect, useState } from 'react';
import { isEmpty } from '../../utils';
import { StoreContext } from '../../context/store-context';

export async function getStaticProps(staticrProps) {
  const params = staticrProps.params;
  const coffeeStores = await fetchCoffeeStores();
  const findCoffeeStores = coffeeStores.find((coffeeStore) => {
    return coffeeStore.id.toString() === params.id;
  });
  return {
    props: {
      coffeeStore: findCoffeeStores ? findCoffeeStores : {}
    }
  };
}

export async function getStaticPaths() {
  const coffeeStores = await fetchCoffeeStores();
  const paths = coffeeStores.map((coffeeStore) => {
    return {
      params: {
        id: coffeeStore.id.toString(),
      },
    };
  });
  return {
    paths,
    fallback: true,
  };
}

export default function CoffeeStore(initialProps) {
  const router = useRouter();




  const id = router.query.id
  const [coffeeStore, setCoffeeStore] = useState(initialProps.coffeeStore)
  const {
    state:{
      coffeeStores
    }
  } = useContext(StoreContext)

useEffect(()=>{
if(isEmpty(initialProps.coffeeStore)) {
  if(coffeeStores.length > 0) {
    const findCoffeeStores = coffeeStores.find((coffeeStore) => {
      return coffeeStore.id.toString() === id;
    });
    setCoffeeStore(findCoffeeStores)
  }
}
}, [])

if (router.isFallback) {
  return <div>Loading...</div>;
}

  const { name, location, imgUrl } = coffeeStore;



  const handleUpvoteButton = () => {
    console.log('kkdk');
  };
 
  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href="/">
              <a>← Back to Home</a>
            </Link>
          </div>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{name}</h1>
          </div>
          <Image
            src={
              imgUrl ||
              'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80'
            }
            width={600}
            height={360}
            alt="l"
            className={styles.storeImage}
          />
        </div>
        <div className={cls('glass', styles.col2)}>
          <div className={styles.iconWrapper}>
            <Image
              src="/static/icons/places.svg"
              width="24"
              height="24"
              alt="d"
            />
            <p className={styles.text}>{location?.address}</p>
          </div>
          {location?.neighborhood && (
            <div className={styles.iconWrapper}>
              <Image
                src="/static/icons/nearMe.svg"
                width="24"
                height="24"
                alt="d"
              />
              <p className={styles.text}>{location?.neighborhood}</p>
            </div>
          )}
          <div className={styles.iconWrapper}>
            <Image
              src="/static/icons/star.svg"
              width="24"
              height="24"
              alt="d"
            />
            <p className={styles.text}>1</p>
          </div>
          <button className={styles.upvoteButton} onClick={handleUpvoteButton}>
            Up Vote
          </button>
        </div>
      </div>
    </div>
  );
}
