import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { WeekDays } from 'store/initial-data';

export const daysGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  if (!Object.keys(WeekDays).includes(route.queryParams['day'])) {
    router.navigate(['day'], {
      queryParams: { day: 'monday' },
      queryParamsHandling: 'merge',
    });
    return false;
  }

  return true;
};
