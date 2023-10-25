import styled from "styled-components";

interface ButtonAddProps {
  disabled?: boolean;
}

interface ModalProps {
  hidden?: boolean;
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

export const CodeList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: calc(100% - 100px);
  overflow-y: auto;
`;

export const Modal = styled.div<ModalProps>`
  position: absolute;
  width: 80%;
  max-height: 80vh;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 12px;
  box-shadow: 1px 1px 5px 3px rgba(0, 0, 0, 0.1);
  padding: 20px;
  z-index: 9999;

  display: ${({ hidden }) => (hidden ? "none" : "flex")};
  flex-direction: column;

  h2 {
    margin: 0;
  }
`;

export const ModalBackdrop = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);
  top: 0px;
  left: 0px;
  z-index: 9998;

  display: ${({ hidden }) => (hidden ? "none" : "block")};
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 5px;
  font-size: 18px;
  font-weight: 600;

  span {
    /* min-width: 10%; */
    text-align: center;
  }

  span:first-child {
    flex-grow: 1;
    text-align: left;
  }

  span:last-child {
    text-align: right;
  }
`;

export const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: auto;
`;

export const ModalRow = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1px solid lightgrey;
  border-radius: 8px;
  padding: 8px;

  span {
    /* min-width: 10%; */
    text-align: center;
  }

  span:first-child {
    flex-grow: 1;
    text-align: left;
  }

  span:last-child {
    text-align: right;
  }
`;

export const ValueDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  min-width: 200px;

  h3 {
    margin: 0;
    font-size: 22px;
  }
`;

export const SizeSpan = styled.span`
  width: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const NameSpan = styled.span`
  flex-grow: 1;
  display: flex;
  align-items: center;
`;
