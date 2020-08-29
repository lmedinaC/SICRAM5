import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import { actions } from './store'
describe('actions', () => {
  let store
  let setDataMock
  let id = '5f483efbda91ec0017ca86b1'
  beforeEach(() => {
    setDataMock = jest.fn()
    store = new Vuex.Store({
      state: { data: {} },
      mutations: {
        SET_DATA_HORARIO: setDataMock
      },
      actions: {
        getHorarios: actions.getHorarios
      }
    })
  })
  it('TEST EN HORARIOS USANDO MOCK', () => {
    store.hotUpdate({
      mutations: { SET_DATA_HORARIO: setDataMock }
    })
    return store.dispatch('getHorarios',id)
      .then((res) => {
        expect(setDataMock.mock.calls[0][1])
          .toEqual([
            {
                "_id": "5f484543da91ec0017ca86b8",
                "fecha": "03/09/2020",
                "hora_inicio": "10:00",
                "hora_fin": "11:00",
                "doctor": "5f483efbda91ec0017ca86b1",
                "__v": 0,
                "cita": "5f484564da91ec0017ca86ba"
            }
        ])
        expect(setDataMock.mock.calls).toHaveLength(1)
      })
  })
})