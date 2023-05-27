import { MongoClient } from 'mongodb';
import Head from 'next/head';
import MeetupList from '../components/meetups/MeetupList';
import { Fragment } from 'react';
const DUMMY_MEETUPS = [
  {
    id: 'm1',
    title: 'A First Meetup',
    image:
      'https://images.musement.com/cover/0002/49/london-jpeg_header-148518.jpeg',
    address: 'Some address 5, 12345 Some city',
    description: 'This is the first meetup!',
  },
  {
    id: 'm2',
    title: 'A Second Meetup',
    image:
      'https://images.musement.com/cover/0002/49/london-jpeg_header-148518.jpeg',
    address: 'Some address 5, 12345 Some city',
    description: 'This is the second meetup!',
  },
];

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React meetups!"
        />
      </Head>
      <MeetupList meetups={props.meetups} />;
    </Fragment>
  );
}

/* export async function getServerSideProps(context) {
  const req = context.req;
  const res = context.res;
  return {
    props: {
      meetups: DUMMY_MEETUPS,
    },
  };
} */

export async function getStaticProps() {
  //fetch('/api/meetups');
  const client = await MongoClient.connect(
    'mongodb+srv://rusira:rusira123@cluster0.d7zw6rs.mongodb.net/meetups?retryWrites=true&w=majority'
  );
  const db = client.db();

  const meetupsCollection = db.collection('meetup_collection');

  const meetups = await meetupsCollection.find().toArray();
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;
