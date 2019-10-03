import * as React from 'react';
import styled from 'styled-components';

type Props = {
  pxValue: string;
  viewport: string;
  vw: string;
  onChangeValue: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeViewport: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeVw: (event: React.ChangeEvent<HTMLInputElement>) => void;
  calcVw: (value: string, viewport: string) => number;
};

//===============================
// @Component
//===============================
const Compornent: React.FC<Props> = React.memo(({...props}) => {
  return (
    <>
      <Title>px to vw</Title>
      <Wrapper>
        <Item>
          <p className="title">desired value</p>
          <Input
            type="number"
            onChange={props.onChangeValue}
            value={props.pxValue}
          />
          <p>px</p>
        </Item>
        <Item>
          <p className="title">baseWitdh</p>
          <Input
            type="number"
            onChange={props.onChangeViewport}
            value={props.viewport}
          />
          <p>px</p>
        </Item>
        <Result>
          <p className="title">Result</p>
          <Input
            onChange={props.onChangeVw}
            value={
              props.pxValue && props.viewport
                ? props.calcVw(props.pxValue, props.viewport)
                : props.vw
            }
          />
          <p>vw</p>
        </Result>
      </Wrapper>
    </>
  );
},
  (prevProps,nextProps)=>{
    return prevProps.vw !== nextProps.vw
  }
)
//===============================
// @Styled
//===============================
const Title = styled.h1`
  text-align: center;
`;
const Wrapper = styled.form`
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
`;

const Item = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
  width: 48%;
  &:nth-of-type(even) {
    margin-left: auto;
  }
  .title {
    display: block;
    text-align: center;
    font-size: 1.2rem;
    margin: 0;
    color: #bbb;
  }
`;
const Result = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
  .title {
    display: block;
    font-size: 1.2rem;
    margin: 0;
    color: #bbb;
  }
`;
const Input = styled.input`
    border: none;
    border-bottom: 1px solid;
    width: 100%;
    max-width: 100%;
    font-size: 3rem;
    + p {
      display: block;
      width: 100%;
      text-align: right;
      margin: 0;
    }
  `;

//===============================
// @Container
//===============================
const App: React.FC = () => {
  const [pxValue, setValue] = React.useState('');
  const [viewport, setViewport] = React.useState('');
  const [vw, setVw] = React.useState('');
  const onChangeValue = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();
      setValue(event.target.value);
    },
    [],
  );
  const onChangeViewport = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();
      setViewport(event.target.value);
    },
    [],
  );
  const onChangeVw = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();
      setVw(event.target.value);
    },
    [],
  );
  const calcVw = React.useCallback(
    (value: string, viewport: string): number => {
      return (Number(value) * 100) / Number(viewport);
    },
    [],
  );

  return (
    <Compornent
      pxValue={pxValue}
      viewport={viewport}
      vw={vw}
      onChangeValue={onChangeValue}
      onChangeViewport={onChangeViewport}
      onChangeVw={onChangeVw}
      calcVw={calcVw}
    />
  );
};

export default App;
