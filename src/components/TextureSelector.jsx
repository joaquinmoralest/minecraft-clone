import { useEffect, useState } from 'react'
import { useKeyboard } from '../hooks/useKeyboard'
import { useStore } from '../hooks/useStore'
import * as images from '../img/images'

export const TextureSelector = () => {
  const [visible, setVisible] = useState(false)
  const [texture, setTexture] = useStore(state => [state.texture, state.setTexture])

  const {
    dirt,
    grass,
    glass,
    log,
    wood
  } = useKeyboard()

  useEffect(() => {
    const visivilityTimeout = setTimeout(() => {
      setVisible(false)
    }, 1500)

    setVisible(true)

    return () => {
      clearTimeout(visivilityTimeout)
    }
  }, [texture])

  useEffect(() => {
    const options = {
      dirt,
      grass,
      glass,
      log,
      wood
    }

    const selectedTexture = Object
      .entries(options)
      .find(([texture, isEnabled]) => isEnabled)

    if (selectedTexture) {
      const [textureName] = selectedTexture
      setTexture(textureName)
    }
  }, [dirt, grass, glass, log, wood])

  if (!visible) return null

  return (
    <div className='texture-selector'>
      {
        Object.entries(images).map(([imgkey, img]) => {
          return (
            <img
              className={texture === imgkey.replace('Img', '') ? 'selected' : ''}
              key={imgkey}
              src={img}
            />
          )
        })
      }
    </div>
  )
}
