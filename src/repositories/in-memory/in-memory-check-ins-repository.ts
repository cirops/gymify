import { CheckIn, Prisma } from '@prisma/client'
import { CheckInsRepository } from '../check-ins-repository'
import { randomUUID } from 'node:crypto'
import dayjs from 'dayjs'

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public items: CheckIn[] = []

  async findById(id: string) {
    const checkIn = this.items.find((checkIn) => checkIn.id === id)

    return checkIn ?? null
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheday = dayjs(date).startOf('date')
    const endofTheDay = dayjs(date).endOf('date')

    const checkinOnSameDate = this.items.find((checkIn) => {
      const checkInDate = dayjs(checkIn.created_at)
      const isOnSameDate =
        checkInDate.isAfter(startOfTheday) && checkInDate.isBefore(endofTheDay)

      return checkIn.user_id === userId && isOnSameDate
    })

    return checkinOnSameDate ?? null
  }

  async findManyByUserId(userId: string, page: number) {
    return this.items
      .filter((checkIn) => checkIn.user_id === userId)
      .slice((page - 1) * 20, page * 20)
  }

  async countByUserId(userId: string) {
    return this.items.filter((checkIn) => checkIn.user_id === userId).length
  }

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn: CheckIn = {
      id: randomUUID(),
      gym_id: data.gym_id,
      user_id: data.user_id,
      created_at: new Date(),
      validated_at: data.validated_at ? new Date() : null,
    }

    this.items.push(checkIn)

    return checkIn
  }

  async save(checkIn: CheckIn) {
    const checkInIndex = this.items.findIndex(
      (currentCheckIn) => currentCheckIn.id === checkIn.id,
    )

    if (checkInIndex > 0) {
      this.items[checkInIndex] = checkIn
    } else {
      this.items.push(checkIn)
    }

    return checkIn
  }
}
