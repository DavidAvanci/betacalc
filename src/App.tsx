import { useEffect, useState } from "react";
import "./App.css";
import {
  Box,
  ButtonAdd,
  ButtonAddGuide,
  CheckboxStyled,
  CodeList,
  CodeRow,
  Container,
  Content,
  DownloadButton,
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
import ReactSelect, { createFilter } from "react-select";
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
  price?: number;
  main: boolean;
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

  const handleChangeMain = (idx: number) => {
    setNewGuide((state) => {
      return {
        ...state,
        codes: state?.codes.map((item, index) => {
          if (index === idx) {
            return { ...item, main: true };
          } else {
            return { ...item, main: false };
          }
        }),
      };
    });
  };

  useEffect(() => {
    console.log("length > ", allGuides.length);
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
                  setCodeOnSelect({ ...codeList[e.idx], main: false });
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
                          main: state.codes.length === 0 ? true : false,
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
                    <div
                      style={{ display: "flex", gap: 10, alignItems: "center" }}
                    >
                      <CheckboxStyled
                        selected={code.main}
                        onClick={() => handleChangeMain(idx)}
                      />
                      <span
                        style={{ cursor: "pointer" }}
                        onClick={() => handleChangeMain(idx)}
                      >
                        {code.code} - {code.name}
                      </span>
                    </div>
                    <FaTrash
                      style={{ cursor: "pointer" }}
                      color="red"
                      onClick={() => {
                        const toRemove = newGuide.codes[idx];

                        const newCodes = newGuide.codes.filter(
                          (_, idx2) => idx2 !== idx
                        );

                        if (toRemove.main && newCodes.length > 0) {
                          newCodes[0].main = true;
                        }

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
                if (state) {
                  return [
                    ...state,
                    { ...newGuide, total: calculateCodes(newGuide.codes) },
                  ];
                } else {
                  return [
                    { ...newGuide, total: calculateCodes(newGuide.codes) },
                  ];
                }
              });
              setNewGuide({
                name: `Guia ${allGuides.length}`,
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
            {allGuides.map((guide) => {
              return (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    borderBottom: "1px solid lightgrey",
                    padding: "5px 2px",
                  }}
                >
                  <span>{guide.name}</span>
                  <span>{formatPrice(guide.total!)}</span>
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
    </Container>
  );
}

export default App;
