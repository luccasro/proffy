import { Request, Response } from 'express';

import db from '../database/connection';
import convertHourToMinutes from '../utils/convertHourToMinutes';

interface ScheduleItem {
  week_day: number;
  from: string;
  to: string;
}
export default class ClassesController {
  async index(request: Request, response: Response) {
    const filters = request.query;

    const subject = filters.subject as string;
    const week_day = filters.week_day as string;
    const time = filters.time as string;

    const classes = await db('classes')
      .whereExists(function () {
        this.select('class_schedule.*')
          .from('class_schedule')
          .whereRaw('"class_schedule"."class_id" = "classes"."id"');
        if (week_day && week_day !== 'all') {
          this.whereRaw('"class_schedule"."week_day" = ?', [Number(week_day)]);
        }
        if (time && time.length) {
          const timeInMinutes = convertHourToMinutes(time);
          this.whereRaw('"class_schedule"."from" <= ?', [
            timeInMinutes,
          ]).andWhereRaw('"class_schedule"."to" > ?', [timeInMinutes]);
        }
      })
      .where((builder) =>
        subject && subject !== 'all'
          ? builder.where('classes.subject', '=', subject)
          : builder,
      )
      .join('users', 'classes.user_id', '=', 'users.id')
      .select(['classes.*', 'users.*']);

    return response.json(classes);
  }

  async getTotalClasses(request: Request, response: Response) {
    const totalClasses = await db('classes').count('* as total');

    const { total } = totalClasses[0];

    return response.json({ total });
  }

  async createClass(request: Request, response: Response) {
    const { name, avatar, whatsapp, bio, subject, cost, schedule } =
      request.body;

    const trx = await db.transaction();

    try {
      const insertedUsersIds = await trx('users')
        .insert({
          name,
          avatar,
          whatsapp,
          bio,
        })
        .returning('id');

      const user_id = insertedUsersIds[0];

      const insertedClassesIds = await trx('classes')
        .insert({
          subject,
          cost,
          user_id,
        })
        .returning('user_id');

      const class_id = insertedClassesIds[0];

      const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
        return {
          class_id,
          week_day: scheduleItem.week_day,
          from: convertHourToMinutes(scheduleItem.from),
          to: convertHourToMinutes(scheduleItem.to),
        };
      });

      await trx('class_schedule').insert(classSchedule);

      await trx.commit();

      return response.status(201).send();
    } catch (err) {
      console.log(err);

      await trx.rollback();

      return response.status(400).json({
        error: 'Unexpected error when creating new class.',
      });
    }
  }
}
