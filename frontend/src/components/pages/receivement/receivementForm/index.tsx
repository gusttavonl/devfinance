import * as S from './styles'
import Button from '@/components/Button'
import Input from '@/components/Input'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

type ReceivementForm = {
  title: string
  description: string
  account: string
  category: string
  value: string
  date: Date
}

type ReceivementFormProps = {
  loadReceivements: () => void
  onClose: () => void
}

const ReceivementForm = ({ loadReceivements, onClose }: ReceivementFormProps) => {
  const { handleSubmit } = useForm<ReceivementForm>()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [value, setValue] = useState('')
  const [date, setDate] = useState<Date>(new Date())

  const handleSubmitReceivement = useCallback(async (): Promise<void> => {
    try {
      toast.success('Recebimento salvo com Sucesso')
    } catch (error) {
      toast.error('Erro ao salvar o recebimento')
    }
  }, [title, description, value, category, date, loadReceivements, onClose])

  return (
    <S.Container>
      <S.ReceivementForm onSubmit={handleSubmit(handleSubmitReceivement)}>
        <S.ReceivementFormInputies>
          <Input
            label="Title"
            type="text"
            onInputChange={setTitle}
            placeholder="Digite o titulo"
            required
          />
          <Input
            label="Descrição"
            type="text"
            onInputChange={setDescription}
            placeholder="Digite a descrição"
            required
          />
          <Input
            label="Categoria"
            type="text"
            onInputChange={setCategory}
            placeholder="Selecione a categoria"
            required
          />
          <Input
            label="Valor"
            type="number"
            onInputChange={setValue}
            placeholder="Digite o valor"
            required
          />
          <Input
            label="Data"
            type="date"
            onInputChange={setDate}
            placeholder="Digite a Data"
            required
          />
        </S.ReceivementFormInputies>

        <S.ReceivementFormButton>
          <Button typeStyle="save" type="submit">
            Salvar
          </Button>
        </S.ReceivementFormButton>
      </S.ReceivementForm>
    </S.Container>
  )
}

export default ReceivementForm