import { PipeTransform, Injectable } from '@nestjs/common'

@Injectable()
export class TrimPipe implements PipeTransform<unknown, unknown> {
  transform(value: unknown): unknown {
    if (typeof value === 'object') {
      Object.keys(value).forEach((key) => (value[key] = this.trim(value[key])))
    }
    return value
  }

  private trim = (value: unknown) =>
    this.isString(value) ? value.trim() : value

  private isString(value: unknown): value is string {
    return typeof value === 'string' || value instanceof String
  }
}
