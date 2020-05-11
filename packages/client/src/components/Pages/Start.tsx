import * as React from 'react'
import styled from 'styled-components'
import { Row, Col } from 'antd'

import { LoginForm } from '../organisms/LoginForm'

const _Start: React.FCX = (props) => {
  return (
    <>
      <Row className={props.className} justify="center">
        <Col className="login-form" span={12}>
          <Row justify="center">
            <Col>
              <LoginForm />
            </Col>
          </Row>
        </Col>
        <Col span={12}>Right</Col>
      </Row>
    </>
  )
}

const Start = styled(_Start)`
  height: 100%;

  > .login-form {
    padding: 20px;
  }
`

export default Start
