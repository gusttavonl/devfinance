import ListDefault from '@/components/ListDefault'
import React from 'react'
import * as S from './styles'

const Debit = () => {
  const defaults = [
    {
      id: 'any_id',
      title: 'any_title',
      description: 'any_description',
      category: 'debit',
      value: '10.00',
      date: new Date()
    },
    {
      id: 'any_id',
      title: 'any_title',
      category: 'receivement',
      description: 'any_description',
      value: '10.00',
      date: new Date()
    }
  ]
  const onRemove = () => {
    console.log('onRemove')
  }
  return (
    <S.Container>
      <ListDefault title="Lista de Debitos" defaults={defaults} onRemove={onRemove}/>
    </S.Container>
  )
}

export default Debit