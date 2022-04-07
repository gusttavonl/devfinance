import Button from '@/components/Button'
import ListCategories from '@/components/ListCategories'
import React, { useCallback, useEffect, useState } from 'react'
import * as S from './styles'
import CategoryDebitAdd from './categoryDebitAdd'
import { Category } from '@/gql/models/category'
import listCategoryDebitsQuery from '@/gql/categoryDebit/ListCategoryDebitsQuery'
import { useMutation, useQuery } from '@apollo/client'
import CategoryDebitDelete from './categoryDebitDelete'
import { toast } from 'react-toastify'
import deleteCategoryDebitMutation from '@/gql/categoryDebit/DeleteCategoryDebitMutation'

const CategoryDebit = () => {
  const [isModalCategoryDebitAddOpen, setIsModalCategoryDebitAddOpen] = useState(false)
  const [isModalCategoryDebitDeleteOpen, setIsModalCategoryDebitDeleteOpen] = useState(false)
  const [idToDelete, setIdToDelete] = useState('')
  const [categoriesDebit, setCategoriesDebit] = useState<Category[]>([])

  const getValueOpen = (value: boolean) => {
    setIsModalCategoryDebitAddOpen(value)
  }

  const getValueOpenDelete = (value: boolean) => {
    setIsModalCategoryDebitDeleteOpen(value)
  }

  const pageLoaded = typeof window !== 'undefined';
  const account = pageLoaded ? localStorage.getItem('account') : '';
  const { data: categoryDebits, loading: loadingCategoryDebits, refetch } = useQuery(listCategoryDebitsQuery, {
    variables: { input: { filters: { account }, paginate: { page: 1, limit: 10 } } },
  });

  const loadCategoryDebits = () => {
    if(categoryDebits?.categoryDebits) {
      refetch()
      setCategoriesDebit(categoryDebits.categoryDebits.items)
    }
  }  

  const [deleteCategoryDebit] = useMutation(deleteCategoryDebitMutation);

  const handleToggleModalCategoryDebitAdd = useCallback(() => {
    setIsModalCategoryDebitAddOpen(!isModalCategoryDebitAddOpen)
  }, [isModalCategoryDebitAddOpen])

  const handleToggleModalCategoryDebitDelete = useCallback(() => {
    setIsModalCategoryDebitDeleteOpen(!isModalCategoryDebitDeleteOpen)
  }, [isModalCategoryDebitDeleteOpen])

  const refreshAndClose = async () => {
    handleToggleModalCategoryDebitDelete()
    await refetch() 
  }
  
  const onDelete =  async (id: string) => {
      try {
        await deleteCategoryDebit({ variables: { id } });
      } catch (error) {
        toast.success('Erro ao excluir categoria!')
      }
      refreshAndClose()
      toast.success('Categoria excluída com sucesso!')
    }

  const onRemove = (id: string) => {
    setIsModalCategoryDebitDeleteOpen(true)
    setIdToDelete(id)
  }

  useEffect(() => {
    getValueOpen(isModalCategoryDebitAddOpen)
    getValueOpenDelete(isModalCategoryDebitDeleteOpen)
  }, [isModalCategoryDebitAddOpen, isModalCategoryDebitDeleteOpen])

  useEffect(() => {
    loadCategoryDebits()
  }, [categoryDebits?.categoryDebits])

  return (
    <S.Container>
      <S.Div>
        <CategoryDebitDelete
          isOpen={isModalCategoryDebitDeleteOpen}
          onClose={handleToggleModalCategoryDebitDelete}
          getValueOpen={getValueOpenDelete}
          onDelete={onDelete}
          id={idToDelete}
        />
        <CategoryDebitAdd
          isOpen={isModalCategoryDebitAddOpen}
          onClose={handleToggleModalCategoryDebitAdd}
          getValueOpen={getValueOpen}
          loadCategoryDebits={loadCategoryDebits}
        />
        <S.ButtonAdd>
          <Button 
            typeStyle="add" 
            children="Adicionar" 
            onClick={() => {
              setIsModalCategoryDebitAddOpen(true)
            }}
          />
        </S.ButtonAdd> 
        {!loadingCategoryDebits &&
          <ListCategories title="Lista de Categorias de Debito" categories={categoriesDebit} onRemove={onRemove}/>
        }
        </S.Div>
    </S.Container>
  )
}

export default CategoryDebit
