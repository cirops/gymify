import { expect, describe, it, beforeEach } from 'vitest'
import { CheckInUseCase } from './checkin'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'

let checkInsRepository: InMemoryCheckInsRepository
let sut: CheckInUseCase

describe('Get CheckIn Profile Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new CheckInUseCase(checkInsRepository)
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      userId: 'user_1',
      gymId: 'gym_1',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
