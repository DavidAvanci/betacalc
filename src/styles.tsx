import styled from "styled-components";

interface ButtonAddProps {
  disabled?: boolean;
}

interface CheckboxStyledProps {
  selected?: boolean;
}

export const Container = styled.div`
  width: 100vw;
  max-width: 1280px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #e9e9e9;
  padding: 20px;
  margin: 0 auto;
  gap: 10px;
`;

export const ButtonAdd = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 8px;
  min-width: 38px;
  height: 38px;
  padding: 0;
  font-size: 18px;
  background-color: #00c2a1;
  color: white;
  cursor: pointer;

  &:focus {
    outline: none;
  }

  ${(props: ButtonAddProps) =>
    props.disabled && `background-color: lightgrey; pointer-events: none; `}
`;

export const ButtonAddGuide = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc(100% - 40px);
  position: absolute;
  bottom: 20px;
  left: 20px;
  gap: 10px;
  border: none;
  border-radius: 8px;
  height: 38px;
  padding: 0;
  font-size: 18px;
  background-color: #00c2a1;
  color: white;
  cursor: pointer;

  &:focus {
    outline: none;
  }

  ${(props: ButtonAddProps) =>
    props.disabled && `background-color: lightgrey; pointer-events: none; `}
`;

export const DownloadButton = styled.button`
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 12px;
  width: 200px;
  min-height: 40px;
  align-self: flex-end;
  padding: 0;
  font-size: 18px;
  background-color: #01a8d1;
  color: white;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;

export const Content = styled.div`
  display: flex;
  width: 100%;
  flex-basis: 50%;
  gap: 15px;
`;

export const Box = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 5px;
  height: calc(100vh - 200px);
  max-width: 50%;

  flex-grow: 1;
  background-color: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 1px 0 5px 1px rgba(0, 0, 0, 0.1);

  h1 {
    margin: 0;
    font-size: 24px;
    font-weight: 700;
  }
`;

export const StyledInput = styled.input`
  border: 1px solid rgb(204, 204, 204);
  border-radius: 5px;
  padding: 10px;
  font-size: 16px;
  width: 100%;
  box-sizing: border-box;

  &:focus {
    outline: none;
  }
`;

export const SelectionDiv = styled.div`
  display: flex;
  gap: 10px;

  > div {
    flex-grow: 1;
  }
`;

export const CodeRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  padding: 5px;

  &:not(:last-child) {
    border-bottom: 1px solid lightgrey;
  }

  svg {
    min-width: 16px;
  }
`;

export const CheckboxStyled = styled.div<CheckboxStyledProps>`
  position: relative;
  min-width: 14px;
  height: 14px;
  border: 1px solid rgb(167, 167, 167);
  border-radius: 50%;
  cursor: pointer;

  &::after {
    content: "";
    background-color: #00c2a1;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    position: absolute;
    top: 2px;
    left: 2px;
    opacity: ${({ selected }) => (selected ? 1 : 0)};
  }
`;

export const CodeList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: calc(100% - 100px);
  overflow-y: auto;
`;
