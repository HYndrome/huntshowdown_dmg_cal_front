import styled from "styled-components";

const CompareItemDiff = styled.div`
  width: 10%;
`;

const CompareItemDiffGood = styled.div`
  width: 10%;
  color: green;
  background-color: #c6efceff;
  padding: 3px;
  font-size: 10px;
  font-weight: bold;
  border-radius: 4px;
  margin: 0px 2px;
  i {
    display: block;
  }
`;

const CompareItemDiffSame = styled.div`
  width: 10%;
  color: gray;
  padding: 3px;
`;

interface IGoodIsGood {
  left: number | undefined;
  right: number | undefined;
}

export function GoodIsGoodL({ left, right }: IGoodIsGood) {
  return (
    <>
      {(left && right) || (left && right === 0) ? (
        left > right ? (
          <CompareItemDiffGood>
            <i className="bi bi-chevron-up"></i>
            <p>
              {(left - right) % 1 !== 0
                ? (left - right).toFixed(1)
                : left - right}
            </p>
          </CompareItemDiffGood>
        ) : left === right ? (
          <CompareItemDiffSame>
            <i className="bi bi-dash-lg"></i>
          </CompareItemDiffSame>
        ) : (
          <CompareItemDiff></CompareItemDiff>
        )
      ) : (
        <CompareItemDiff></CompareItemDiff>
      )}
    </>
  );
}

export function GoodIsGoodR({ left, right }: IGoodIsGood) {
  return (
    <>
      {(left && right) || (right && left === 0) ? (
        left < right ? (
          <CompareItemDiffGood>
            <i className="bi bi-chevron-up"></i>
            <p>
              {(right - left) % 1 !== 0
                ? (right - left).toFixed(1)
                : right - left}
            </p>
          </CompareItemDiffGood>
        ) : left === right ? (
          <CompareItemDiffSame>
            <i className="bi bi-dash-lg"></i>
          </CompareItemDiffSame>
        ) : (
          <CompareItemDiff></CompareItemDiff>
        )
      ) : (
        <CompareItemDiff></CompareItemDiff>
      )}
    </>
  );
}

export function BadIsGoodL({ left, right }: IGoodIsGood) {
  return (
    <>
      {(left && right) || (right && left === 0) ? (
        left < right ? (
          <CompareItemDiffGood>
            <i className="bi bi-chevron-down"></i>
            <p>
              {(right - left) % 1 !== 0
                ? (right - left).toFixed(1)
                : right - left}
            </p>
          </CompareItemDiffGood>
        ) : left === right ? (
          <CompareItemDiffSame>
            <i className="bi bi-dash-lg"></i>
          </CompareItemDiffSame>
        ) : (
          <CompareItemDiff></CompareItemDiff>
        )
      ) : (
        <CompareItemDiff></CompareItemDiff>
      )}
    </>
  );
}

export function BadIsGoodR({ left, right }: IGoodIsGood) {
  return (
    <>
      {(left && right) || (left && right === 0) ? (
        left > right ? (
          <CompareItemDiffGood>
            <i className="bi bi-chevron-down"></i>
            <p>
              {(left - right) % 1 !== 0
                ? (left - right).toFixed(1)
                : left - right}
            </p>
          </CompareItemDiffGood>
        ) : left === right ? (
          <CompareItemDiffSame>
            <i className="bi bi-dash-lg"></i>
          </CompareItemDiffSame>
        ) : (
          <CompareItemDiff></CompareItemDiff>
        )
      ) : (
        <CompareItemDiff></CompareItemDiff>
      )}
    </>
  );
}
