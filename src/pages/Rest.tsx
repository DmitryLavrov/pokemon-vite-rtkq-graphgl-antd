import React, {useState} from 'react'
import {useGetPokemonByNumberQuery} from '../services/pokemonApi'
import {Button, Card, Tooltip} from 'antd'
import {CaretLeftOutlined, CaretRightOutlined, BackwardOutlined, ForwardOutlined} from '@ant-design/icons'
import {useActions} from '../hooks/actions'
import {useAppSelector} from '../hooks/redux'

const Rest: React.FC = () => {
  const [showArtwork, setShowArtwork] = useState(false)
  const {value} = useAppSelector(state => state.counter)
  const pokemonNum = value.toString()

  // Using a query hook automatically fetches data and returns query values
  const {data, error, isLoading} = useGetPokemonByNumberQuery(pokemonNum, {refetchOnFocus: true})

  // const pokemonImg = data?.sprites.other['official-artwork'].front_default
  const pokemonImg = showArtwork
    ? data?.sprites.other['official-artwork'].front_default
    : data?.sprites.other.home.front_default

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
                                  alt={data.species.name}/>}
                >
                  <Card.Meta title={data.species.name}
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

export default Rest
