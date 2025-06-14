import {
  Avatar,
  Button,
  Heading,
  MultiStep,
  Text,
  TextArea,
} from '@ignite-ui/react';
import { ArrowRight } from 'phosphor-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Container, Header } from '../styles';
import { FormAnnotation, ProfileBox } from './styles';
import { useSession } from 'next-auth/react';
import { unstable_getServerSession } from 'next-auth';
import { buildNextAuthOptions } from '../../api/auth/[...nextauth].api';
import { api } from '@/src/lib/axios';

const updateProfileSchema = z.object({
  bio: z.string(),
});

type UpdateProfileData = z.infer<typeof updateProfileSchema>;

export default function UpdateProfile() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<UpdateProfileData>({
    resolver: zodResolver(updateProfileSchema),
  });
  const session = useSession();
  const router = useRouter();

  async function handleUpdateProfile(data: UpdateProfileData) {
    await api.put('/users/profile', {
      bio: data.bio,
    });
    await router.push(`/schedule/${session.data?.user.username}`);
  }

  return (
    <Container>
      <Header>
        <Heading as="strong">Bem-vindo ao ignite Call</Heading>
        <Text>
          Precisamos de alumas informações para criar o seu perfil! Ah, você
          pode editar essas informações depois.
        </Text>
        <MultiStep size={4} currentStep={4} />
      </Header>

      <ProfileBox as="form" onSubmit={handleSubmit(handleUpdateProfile)}>
        <label>
          <Text size="sm">Foto de perfil </Text>
          <Avatar
            src={session.data?.user.avatar_url}
            alt={session.data?.user.name}
          />
        </label>

        <label>
          <Text size="sm">Sobre você</Text>
          <TextArea {...register('bio')} />
          <FormAnnotation size="sm">
            Fale um pouco sobre você. Iso será exibido em sua página pessoal.
          </FormAnnotation>
        </label>

        <Button type="submit" disabled={isSubmitting}>
          Finalizar
          <ArrowRight />
        </Button>
      </ProfileBox>
    </Container>
  );
}

import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const { req, res } = context;
  const session = await unstable_getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res),
  );

  // Se existir session, garanta que user.image nunca será undefined
  if (session && session.user) {
    session.user.image = session.user.image ?? null;
  }

  return {
    props: {
      session,
    },
  };
};
