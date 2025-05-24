import {
  Button,
  Checkbox,
  Heading,
  MultiStep,
  Text,
  TextInput,
} from '@ignite-ui/react';
import { Container, Header } from '../styles';
import {
  IntervalBox,
  IntervalContainer,
  IntervalDay,
  IntervalInputs,
  IntervalItem,
} from './styles';
import { ArrowRight } from 'phosphor-react';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';
import { getWeekDays } from '@/src/utils/get-week-days';

//NOTE: Formulário --------------------------
const timeIntervalsSchema = z.object({});

export default function TimeIntervals() {
  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      intervals: [
        { weekDay: 0, enabled: false, startTime: '08:00', endTime: '18:00' },
        { weekDay: 1, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 2, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 3, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 4, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 5, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 6, enabled: false, startTime: '08:00', endTime: '18:00' },
      ],
    },
  });
  const weekDays = getWeekDays();

  const { fields } = useFieldArray({
    control,
    name: 'intervals',
  });

  //Quando o usuário clicar no botão "Próximo passo", o formulário será enviado
  async function handleFormSubmit() {}

  //NOTE: Formulário --------------------------

  return (
    <Container>
      <Header>
        <Heading as="strong">Quase lá</Heading>
        <Text>
          Defina os intervalos de tempo em que você está disponível em cada dia
          da semana.
        </Text>
        <MultiStep size={4} currentStep={3} />
      </Header>

      <IntervalBox as="form" onSubmit={handleSubmit(handleFormSubmit)}>
        <IntervalContainer>
          {fields.map((field, index) => {
            return (
              <IntervalItem key={field.id}>
                <IntervalDay>
                  <Checkbox className="bg-" />
                  <Text> {weekDays[field.weekDay]} </Text>
                </IntervalDay>
                <IntervalInputs>
                  <TextInput
                    size="sm"
                    type="time"
                    step={60}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                    crossOrigin={undefined}
                    {...register(`intervals.${index}.startTime`)}
                  />

                  <TextInput
                    size="sm"
                    type="time"
                    step={60}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                    crossOrigin={undefined}
                    {...register(`intervals.${index}.endTime`)}
                  />
                </IntervalInputs>
              </IntervalItem>
            );
          })}
        </IntervalContainer>
        <Button type="submit">
          Próximo passo
          <ArrowRight size={24} />
        </Button>
      </IntervalBox>
    </Container>
  );
}
