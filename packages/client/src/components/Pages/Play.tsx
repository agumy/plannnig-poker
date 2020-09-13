import * as React from 'react'
import styled from 'styled-components'
import { Row, Col, Button, Input, Space } from 'antd'
import { SocketContext } from '../../context/SocketContext'

const _Play: React.FCX = (props) => {
  const { room, user, isPlaying, commands } = React.useContext(SocketContext)
  const [point, setPoint] = React.useState(0)
  const draw = React.useCallback(() => {
    commands?.drawCard(point)
  }, [point])
  return (
    <>
      <Row className={props.className} justify="center">
        <Col className="play" span={12}>
          <Row justify="center">
            <Space>
              {user?.isHost && (
                <>
                  <Col>You are Host!!</Col>
                  <Col>
                    {!isPlaying && (
                      <Button onClick={commands?.startGame}>Start</Button>
                    )}
                  </Col>
                </>
              )}
              {isPlaying && (
                <>
                  <Col>Card:</Col>
                  <Col>
                    <Input onChange={(e) => setPoint(Number(e.target.value))} />
                  </Col>
                  <Col>
                    <Button onClick={draw}>Draw</Button>
                  </Col>
                  <Col>Your name: {user?.name}</Col>
                </>
              )}
            </Space>
          </Row>
          <Row justify="center">
            <Space>
              <ul>
                {room?.members.some((member) => !member.isDecided) &&
                  room?.members.map((member) => (
                    <li>
                      {member.name}:{' '}
                      {isPlaying
                        ? member.isDecided
                          ? 'picked!'
                          : 'picking....'
                        : ''}
                    </li>
                  ))}
                {room?.members.every((member) => member.isDecided) &&
                  room?.members.map((member) => (
                    <li>
                      {member.name}
                      {member.point}
                    </li>
                  ))}
              </ul>
            </Space>
          </Row>
        </Col>
        <Col span={12}>Right</Col>
      </Row>
    </>
  )
}

const Play = styled(_Play)`
  height: 100%;

  > .play {
    padding: 20px;
  }
`

export default Play
