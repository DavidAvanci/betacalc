import { useEffect, useState } from "react";
import "./App.css";
import {
  Box,
  ButtonAdd,
  ButtonAddGuide,
  CodeList,
  CodeRow,
  Container,
  Content,
  DownloadButton,
  Modal,
  ModalBackdrop,
  ModalHeader,
  ModalRow,
  SelectionDiv,
  StyledInput,
} from "./styles";
import { formatPrice } from "./utils/formatPrice";
import {
  FaDownload,
  FaLongArrowAltRight,
  FaPlus,
  FaTrash,
} from "react-icons/fa";
import ReactSelect from "react-select";
import { codeList } from "./utils/codeList";
import { calculateCodes } from "./utils/calculateCodes";

interface GuideProps {
  name: string;
  codes: CodeProps[];
  total?: number;
}

export interface CodeProps {
  code: number;
  name: string;
  value?: number;
  multiplier?: number;
  size: string;
}

function App() {
  const [allGuides, setAllGuides] = useState<GuideProps[]>([]);
  const [newGuide, setNewGuide] = useState<GuideProps>({
    name: `Guia ${allGuides.length + 1}`,
    codes: [],
    total: 0,
  });
  const [codeOnSelect, setCodeOnSelect] = useState<CodeProps | null>(null);
  const [guideToShow, setGuideToShow] = useState<GuideProps | null>(null);
  const [modalHidden, setModalHidden] = useState<boolean>(true);

  useEffect(() => {
    console.log("allGuides > ", allGuides);
  }, [allGuides]);

  return (
    <Container>
      <h1 style={{ marginTop: 0 }}>Calcule seus ganhos</h1>
      <Content>
        <Box style={{ paddingBottom: 60 }}>
          <h1>Nova guia</h1>
          <StyledInput
            placeholder="Nome da guia (opcional)"
            value={newGuide.name}
            onChange={(e) =>
              setNewGuide((state) => {
                return { ...state, name: e.target.value };
              })
            }
          />
          <SelectionDiv>
            <ReactSelect
              options={codeList.map((item, idx) => {
                return {
                  value: item.code,
                  label: `${item.code} - ${item.name}`,
                  idx,
                };
              })}
              onChange={(e) => {
                if (e) {
                  setCodeOnSelect(codeList[e.idx]);
                }
              }}
            />
            <ButtonAdd
              disabled={!codeOnSelect}
              onClick={() => {
                if (codeOnSelect) {
                  setNewGuide((state) => {
                    return {
                      ...state,
                      codes: [
                        ...state?.codes,
                        {
                          ...codeOnSelect,
                        },
                      ],
                    };
                  });
                }
              }}
            >
              <FaPlus size={18} />
            </ButtonAdd>
          </SelectionDiv>
          <CodeList>
            {newGuide.codes.length === 0 ? (
              <div style={{ margin: "0 auto" }}>Guia vazia</div>
            ) : (
              newGuide.codes.map((code, idx) => {
                return (
                  <CodeRow>
                    <span style={{ cursor: "pointer" }}>
                      {code.code} - {code.name}
                    </span>

                    <FaTrash
                      style={{ cursor: "pointer" }}
                      color="red"
                      onClick={() => {
                        const newCodes = newGuide.codes.filter(
                          (_, idx2) => idx2 !== idx
                        );

                        setNewGuide((state) => {
                          return { ...state, codes: newCodes };
                        });
                      }}
                    />
                  </CodeRow>
                );
              })
            )}
          </CodeList>

          <ButtonAddGuide
            disabled={newGuide.codes.length === 0}
            onClick={() => {
              calculateCodes(newGuide.codes);
              setAllGuides((state) => {
                const calculated = calculateCodes(newGuide.codes);
                if (state) {
                  return [
                    ...state,
                    {
                      ...newGuide,
                      codes: calculated,
                      total: calculated.reduce(
                        (acc, cur) =>
                          acc + (cur.value || 0) * (cur.multiplier || 0),
                        0
                      ),
                    },
                  ];
                } else {
                  return [
                    {
                      ...newGuide,
                      codes: calculated,
                      total: calculated.reduce(
                        (acc, cur) =>
                          acc + (cur.value || 0) * (cur.multiplier || 0),
                        0
                      ),
                    },
                  ];
                }
              });
              setNewGuide({
                name: `Guia ${allGuides.length + 2}`,
                codes: [],
                total: 0,
              });
            }}
          >
            Adicionar <FaLongArrowAltRight />
          </ButtonAddGuide>
        </Box>
        <Box>
          <h1>Guias adicionadas</h1>
          <div style={{ height: "100%", overflowY: "auto" }}>
            {allGuides.map((guide, idx) => {
              return (
                <div
                  onClick={() => {
                    setGuideToShow(guide);
                    setModalHidden(false);
                  }}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    borderBottom: "1px solid lightgrey",
                    padding: "5px 2px",
                    cursor: "pointer",
                  }}
                >
                  <span>{guide.name}</span>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 10 }}
                  >
                    <span>{formatPrice(guide.total!)}</span>
                    <FaTrash
                      style={{ cursor: "pointer" }}
                      color="red"
                      onClick={() => {
                        setAllGuides((state) => {
                          return state.filter((_, idx2) => idx2 !== idx);
                        });
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontWeight: 600,
              fontSize: 20,
            }}
          >
            <span>Total</span>

            <span>
              {formatPrice(
                allGuides.reduce((acc, cur) => acc + (cur.total || 0), 0)
              )}
            </span>
          </div>
        </Box>
      </Content>
      <DownloadButton>
        <FaDownload size={14} /> Baixar
      </DownloadButton>
      <div>
        <ModalBackdrop
          hidden={modalHidden}
          onClick={() => {
            setGuideToShow(null);
            setModalHidden(true);
          }}
        />
        <Modal hidden={modalHidden}>
          <h2>{guideToShow?.name}</h2>
          <ModalHeader>
            <span>Código - Nome</span>
            <span>Porte</span>
            <span>Valor</span>
          </ModalHeader>
          {guideToShow?.codes.map((code) => {
            return (
              <ModalRow
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  borderBottom: "1px solid lightgrey",
                  padding: "5px 2px",
                }}
              >
                <span>
                  {code.code} - {code.name}
                </span>
                <span>{code.size}</span>
                <span>
                  {formatPrice(code.value || 0)}({(code.multiplier || 0) * 100}
                  %)
                </span>
              </ModalRow>
            );
          })}
          <ModalRow
            style={{
              display: "flex",
              justifyContent: "space-between",
              borderBottom: "1px solid lightgrey",
              padding: "5px 2px",
            }}
          >
            <span>Total</span>
            <span> </span>
            <span>{formatPrice(guideToShow?.total || 0)}</span>
          </ModalRow>
        </Modal>
      </div>
    </Container>
  );
}

export default App;
