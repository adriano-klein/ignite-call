import { Avatar, Heading, Text } from '@ignite-ui/react';
import { Container, UserHeader } from './styles';
import { prisma } from '@/src/lib/prisma';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ScheduleForm } from './ScheduleForm';
import { get } from 'http';
import { getWeekDays } from '@/src/utils/get-week-days';

interface ScheduleProps {
  user: {
    name: string;
    bio: string;
    avatarUrl: string;
  };
}

export default function Schedule({ user }: ScheduleProps) {
  const weekDays = getWeekDays({ short: true });
  return (
    <Container>
      <UserHeader>
        <Avatar src={user.avatarUrl} />
        <Heading> {user.name} </Heading>
        <Text>{user.bio}</Text>
      </UserHeader>

      <ScheduleForm />
    </Container>
  );
}

//NOTE: This file is used to display the user's schedule page.
// It fetches user data from the database based on the username in the URL.
// It uses Next.js's static generation features to pre-render the page.
// The page will be generated on demand if the user is not found, and it will revalidate every 24 hours.
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking', // Will generate pages on demand if not found
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const username = String(params?.username);

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (!user) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      user: {
        name: user.name,
        bio: user.bio,
        avatarUrl: user.avatar_url,
      },
    },
    revalidate: 60 * 60 * 24, // 24 hours
  };
};
