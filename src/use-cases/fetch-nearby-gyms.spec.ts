import { GymsRepository } from '@/repositories/gyms-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

let gymsRepository: GymsRepository
let sut: FetchNearbyGymsUseCase

describe('Search Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Near Gym',
      description: null,
      phone: null,
      latitude: -27.5853523,
      longitude: -48.5085744,
    })

    await gymsRepository.create({
      title: 'Far Gym',
      description: null,
      phone: null,
      latitude: -27.5853523,
      longitude: -49.4917664,
    })

    const { gyms } = await sut.execute({
      userLatitude: -27.6001231,
      userLongitude: -48.5685744,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })

  // it('should be able to fetch paginated gyms search', async () => {
  //   for (let i = 1; i <= 22; i += 1) {
  //     await gymsRepository.create({
  //       title: `JavaScript Gym ${i}`,
  //       description: null,
  //       phone: null,
  //       latitude: -27.5853523,
  //       longitude: -48.5085744,
  //     })
  //   }

  //   const { gyms } = await sut.execute({
  //     query: 'JavaScript',
  //     page: 2,
  //   })

  //   expect(gyms).toHaveLength(2)
  //   expect(gyms).toEqual([
  //     expect.objectContaining({ title: 'JavaScript Gym 21' }),
  //     expect.objectContaining({ title: 'JavaScript Gym 22' }),
  //   ])
  // })
})
