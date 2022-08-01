import React, {useState} from 'react'
import {useQuery} from '@apollo/client'
import {GET_POKEMON_BY_ID} from '../services/pokemonGql'
import {useAppSelector} from '../hooks/redux'
import {useActions} from '../hooks/actions'
import {Button, Card, Tooltip} from 'antd'
import {BackwardOutlined, CaretLeftOutlined, CaretRightOutlined, ForwardOutlined} from '@ant-design/icons'

interface CounterState {
  value: number
}

const Graphql: React.FC = () => {
  const [showArtwork, setShowArtwork] = useState(true)
  const {value}: CounterState = useAppSelector(state => state.counter)
  const pokemonNum = value.toString()

  const {data, loading: isLoading, error} = useQuery(GET_POKEMON_BY_ID, {variables: {id: value}})

  const name = data?.getPokemonById[0].name

  const sprites = JSON.parse(data?.getPokemonSpritesById[0].sprites ?? 'null')
  const pokemonImg = showArtwork
    ? sprites?.other['official-artwork'].front_default
    : sprites?.other.home.front_default

  const {increment, incrementOnValue, decrement, decrementOnValue} = useActions()

  function next(event: React.MouseEvent<HTMLElement>) {
    event.preventDefault()
    increment()
  }

  function next10(event: React.MouseEvent<HTMLElement>) {
    event.preventDefault()
    incrementOnValue(10)
  }

  function previous(event: React.MouseEvent<HTMLElement>) {
    event.preventDefault()
    decrement()
  }

  function previous10(event: React.MouseEvent<HTMLElement>) {
    event.preventDefault()
    decrementOnValue(10)
  }

  return (
    <div style={{marginTop: '2rem'}}>
      {error
        ? <>Oh no, there was an error</>
        : isLoading
          ? <>Loading...</>
          : data
            ? (
              <div style={{margin: 'auto'}}>
                <Card hoverable
                      onMouseOver={() => setShowArtwork(true)}
                      onMouseLeave={() => setShowArtwork(false)}
                      style={{width: 240, margin: 'auto'}}
                      cover={<img src={pokemonImg}
                                  alt={name}/>}
                >
                  <Card.Meta title={name}
                             description={pokemonNum}
                             style={{margin: 'auto', width: 'fit-content'}}/>
                </Card>

                <div style={{
                  marginTop: '3rem',
                  display: 'flex',
                  width: 240,
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  justifyContent: 'space-around'
                }}>
                  <Tooltip title="Previous">
                    <Button type="primary"
                            shape="circle"
                            icon={<BackwardOutlined/>}
                            size="large"
                            disabled={parseInt(pokemonNum) < 11}
                            onClick={event => previous10(event)}/>
                    <Button type="primary"
                            shape="circle"
                            icon={<CaretLeftOutlined/>}
                            size="large"
                            disabled={pokemonNum === '1'}
                            onClick={event => previous(event)}/>
                  </Tooltip>

                  <Tooltip title="Next">
                    <Button type="primary"
                            shape="circle"
                            icon={<CaretRightOutlined/>}
                            size="large"
                            onClick={event => next(event)}/>
                    <Button type="primary"
                            shape="circle"
                            icon={<ForwardOutlined/>}
                            size="large"
                            onClick={event => next10(event)}/>
                  </Tooltip>
                </div>
              </div>
            )
            : null
      }
    </div>
  )
}

export default Graphql
