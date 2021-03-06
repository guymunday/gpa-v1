import styled from "styled-components";

const FilterStyles = styled.form`
  flex: 25%;
  background: var(--yellow);
  margin-right: 30px;
  padding: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  @media screen and (max-width: 600px) {
    flex: 1;
    width: 100%;
  }
  .sticky {
    position: sticky;
    top: 0;
    .filter {
      .container {
        position: relative;
        margin-bottom: 1rem;
        cursor: pointer;
        user-select: none;
        padding-left: 40px;
        input {
          position: absolute;
          opacity: 0;
          cursor: pointer;
        }
        .checkmark {
          position: absolute;
          top: 0;
          left: 0;
          height: 1.3rem;
          width: 1.3rem;
          background-color: var(--background);
        }
      }
      .container:hover input ~ .checkmark {
        background-color: white;
      }

      .checkmark:after {
        content: "";
        position: absolute;
        display: none;
      }

      .container input:checked ~ .checkmark:after {
        display: block;
      }

      .container .checkmark:after {
        top: 0.2rem;
        left: 0.2rem;
        width: 0.9rem;
        height: 0.9rem;
        background: var(--copycolor);
      }
      .order {
        /* justify-self: baseline;
      align-self: baseline; */
        button {
          padding: 20px;
          width: 100%;
          background: var(--copycolor);
          border: none;
          outline: none;
          color: var(--background);
          font-family: var(--cooper);
          font-size: 1.2rem;
          cursor: pointer;
          @media screen and (max-width: 768px) {
            font-size: 1rem;
          }
        }
      }
    }
  }
`;

export default function Filter({ brands, setBrand, orderForms }) {
  return (
    <FilterStyles>
      <div className="sticky">
        <div className="filter">
          <p style={{ margin: "18px 0" }}>Brands</p>
          {brands.map((b, i) => {
            return (
              <div className="filter-inner" key={i}>
                <label className="container">
                  {b.data.brand_name}
                  <input
                    type="radio"
                    id={b.uid}
                    name="brands"
                    value={b.uid}
                    onChange={(event) => {
                      setBrand(event.target.value);
                    }}
                  />
                  <span className="checkmark" />
                </label>
              </div>
            );
          })}
          <label className="container">
            Show All
            <input
              type="radio"
              id="all"
              name="brands"
              value="all"
              onChange={(event) => {
                setBrand(event.target.value);
              }}
            />
            <span className="checkmark" />
          </label>
        </div>
        <div className="filter">
          {orderForms.map((form, i) => {
            return (
              <form
                key={i}
                className="order"
                action={form.data.order.url}
                method="get"
                target="_blank"
                style={{ marginTop: i === 0 ? 50 : 20 }}
              >
                <button type="submit">{form.data.title}</button>
              </form>
            );
          })}
        </div>
      </div>
    </FilterStyles>
  );
}
