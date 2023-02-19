import { useBox } from '@react-three/cannon'
import { useState } from 'react'
import { useStore } from '../hooks/useStore.js'
import * as textures from '../img/textures.js'

export const Cube = ({ id, position, texture }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [removeCube, addCube] = useStore(state => [state.removeCube, state.addCube])

  const [ref] = useBox(() => ({
    type: 'Static',
    position
  }))

  const activeTexture = textures[texture + 'Texture']

  return (
    <mesh
      ref={ref}
      onPointerMove={(e) => {
        e.stopPropagation()
        setIsHovered(true)
      }}
      onPointerOut={(e) => {
        e.stopPropagation()
        setIsHovered(false)
      }}
      onClick={(e) => {
        e.stopPropagation()

        const clickedFace = Math.floor(e.faceIndex / 2)
        const { x, y, z } = ref.current.position

        if (clickedFace === 0) {
          addCube(x + 1, y, z)
        } else if (clickedFace === 1) {
          addCube(x - 1, y, z)
        } else if (clickedFace === 2) {
          addCube(x, y + 1, z)
        } else if (clickedFace === 3) {
          addCube(x, y - 1, z)
        } else if (clickedFace === 4) {
          addCube(x, y, z + 1)
        } else if (clickedFace === 5) {
          addCube(x, y, z - 1)
        }

        if (e.altKey) {
          removeCube(id)
        }
      }}
    >
      <boxBufferGeometry attach='geometry' />
      <meshStandardMaterial
        color={isHovered ? 'gray' : 'white'}
        attach='material'
        map={activeTexture}
      />
    </mesh>
  )
}
