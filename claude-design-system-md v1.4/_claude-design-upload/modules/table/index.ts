/**
 * # Table Module
 *
 * 단일 공개 엔트리. 외부 소비자는 이 파일에서만 import 한다.
 *
 * ## 데이터 공급자 두 가지
 *
 * ### TableData — 부모가 직접 fetch
 * 외부 필터(드로워/상단 패널 등)와 테이블 상태가 엮일 때. 부모가 `useQuery`로
 * 데이터를 가져오고, 테이블은 받은 data/pageSummary만 표시.
 *
 *     const UserTable = createTableModule<User>();
 *
 *     function UserListPage() {
 *       const [page, setPage] = useState(0);
 *       const { data } = useQuery(usersListOptions({ page, filters }));
 *
 *       return (
 *         <UserTable.TableData
 *           data={{ content: data?.rows ?? [], pageSummary: data?.pageSummary }}
 *           onQueryChange={(p) => {
 *             if (typeof p.page === "number") setPage(p.page);
 *           }}
 *         >
 *           <UserTable.TableModule renderColumns={...}>
 *             <UserTable.TableModule.Body />
 *             <UserTable.TableModule.Pagination />
 *           </UserTable.TableModule>
 *         </UserTable.TableData>
 *       );
 *     }
 *
 * ### TableQuery — 테이블이 내부에서 fetch
 * 외부 상태 엮임이 없고 단독 테이블로 충분할 때. `queryFn(queryString)`만 주면
 * 내부 useQuery + 페이지·필터·정렬 상태 관리까지 자동.
 *
 *     <UserTable.TableQuery
 *       queryKey="users"
 *       queryFn={(q) => api.get(`/users?${q}`)}
 *       responseAdapter={(res) => ({ content: res.items, pageSummary: res.page })}
 *       initQueryParams={{ page: 0, pageSize: 20 }}
 *     >
 *       <UserTable.TableModule renderColumns={...}>
 *         <UserTable.TableModule.Body />
 *         <UserTable.TableModule.Pagination />
 *       </UserTable.TableModule>
 *     </UserTable.TableQuery>
 *
 * ## 선택 기준
 *
 * | 상황 | 선택 |
 * |---|---|
 * | 외부 필터/드로워와 엮임 | `TableData` |
 * | 페이지 리셋을 부모가 제어 | `TableData` |
 * | 단독 테이블, filter/sort가 `TableModule.Search/Filter`만 | `TableQuery` |
 *
 * ## 현재 한계
 *
 * - 외부 필터 변경 시 내부 페이지 자동 리셋 API 없음. `TableData`에서는
 *   부모가 `onQueryChange`와 별개로 자체 page state를 관리해야 함.
 */

import "./column-meta";

export { createTableModule } from "./create-table-module";

export type {
  CreateTableModuleResult,
  NextRenderColumns,
  PageSummary,
  ResResponse,
  TableBodyProps,
  TableQueryProps,
  TableDataProps,
  TableDndProps,
  TableDragSourceContext,
  TableFilterSearchProps,
  TableModuleContextValue,
  TableModuleProps,
  TablePaginationProps,
  TableQueryParams,
  TableResponse,
  TableSearchProps,
  TableSourceContextValue,
  TableToolbarProps,
} from "./types";

// 앱에서 직접 import 필요했던 내부 컴포넌트 — public re-export
export { default as CheckboxComponent } from "./components/cells/checkbox-component";
